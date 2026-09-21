/**
 * Envoi des mails aux votants — côté serveur uniquement.
 *
 * Le compte d’envoi est celui des Retro Awards (Gmail + mot de passe
 * d’application). Sans variables d’environnement, l’envoi est simplement
 * ignoré : un mail qui ne part pas ne doit jamais faire échouer un vote.
 */
import nodemailer, { type Transporter } from 'nodemailer';
import { siteUrl } from './site';

const USER = process.env.MAIL_USER;
const PASS = process.env.MAIL_APP_PASSWORD;
const FROM_NAME = process.env.MAIL_FROM_NAME ?? 'Retro Awards';
const SITE = siteUrl();

export function isMailConfigured(): boolean {
  return Boolean(USER && PASS);
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: USER, pass: PASS },
    });
  }
  return transporter;
}

/** Une ligne de récapitulatif : une année, et ce qui a été voté. */
export type RecapYear = {
  year: number;
  podium: string[];
  anime: string | null;
};

const NEON = '#00ffcc';
const BG = '#0d0a06';
const CARD = '#151109';
const TEXT = '#e8dcc0';
const DIM = '#9c8f74';

function shell(title: string, body: string): string {
  return `<div style="margin:0;padding:24px 0;background:${BG};font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:0 16px">
    <p style="margin:0 0 20px;text-align:center">
      <img src="${SITE}/logo-retro.png" alt="Retro Awards" width="150" style="display:inline-block;width:150px;height:auto;border:0">
    </p>
    <div style="background:${CARD};border:1px solid #2a2118;border-radius:10px;padding:24px">
      <h1 style="margin:0 0 16px;font-size:20px;color:${TEXT}">${title}</h1>
      ${body}
    </div>
    <p style="margin:20px 0 0;text-align:center;font-size:11px;color:${DIM}">
      Tu reçois ce message parce que tu as voté sur ${SITE}.
    </p>
  </div>
</div>`;
}

async function send(to: string, subject: string, html: string, text: string) {
  if (!isMailConfigured()) {
    console.warn('[mail] non configuré, envoi ignoré :', subject);
    return;
  }
  await getTransporter().sendMail({
    from: `"${FROM_NAME}" <${USER}>`,
    to,
    subject,
    text,
    html,
  });
}

/** Confirmation d’inscription, à la première participation. */
export async function sendWelcome(email: string, pseudo: string): Promise<void> {
  const html = shell(
    `Bienvenue ${pseudo} !`,
    `<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${TEXT}">
       Ta participation aux Retro Awards est confirmée. Tu peux voter pour chaque année, de 2005 à 2019.
     </p>
     <ul style="margin:0 0 18px;padding-left:18px;font-size:14px;line-height:1.7;color:${DIM}">
       <li>Meilleur anime : <strong style="color:${TEXT}">un vote par année</strong></li>
       <li>Meilleur opening : <strong style="color:${TEXT}">un podium de 3</strong> — 10 points pour le 1er, 6 pour le 2e, 3 pour le 3e</li>
     </ul>
     <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${DIM}">
       Chaque vote est définitif, prends ton temps. Les résultats seront dévoilés à la clôture.
     </p>
     <a href="${SITE}" style="display:inline-block;background:${NEON};color:${BG};font-weight:bold;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:6px">Aller voter</a>`,
  );
  const text = `Bienvenue ${pseudo} !\n\nTa participation aux Retro Awards est confirmée.\nMeilleur anime : un vote par année. Meilleur opening : un podium de 3 (10, 6 et 3 points).\nChaque vote est définitif.\n\n${SITE}`;
  await send(email, 'Ta participation aux Retro Awards est confirmée', html, text);
}

/** Récapitulatif complet des votes, envoyé à la demande. */
export async function sendRecap(email: string, pseudo: string, years: RecapYear[]): Promise<void> {
  const blocks = years
    .map((y) => {
      const podium = y.podium.length
        ? `<p style="margin:6px 0 0;font-size:13px;line-height:1.7;color:${DIM}">
             ${y.podium.map((label, i) => `<span style="color:${NEON}">${i + 1}.</span> ${label}`).join('<br>')}
           </p>`
        : '';
      const anime = y.anime
        ? `<p style="margin:6px 0 0;font-size:13px;color:${DIM}">Anime : <span style="color:${TEXT}">${y.anime}</span></p>`
        : '';
      return `<div style="padding:12px 0;border-top:1px solid #2a2118">
          <p style="margin:0;font-size:15px;font-weight:bold;color:${TEXT}">${y.year}</p>
          ${anime}${podium}
        </div>`;
    })
    .join('');

  const html = shell(
    `Le récap de tes votes, ${pseudo}`,
    `<p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${DIM}">
       Voilà tout ce que tu as voté jusqu’ici. Garde ce mail, les résultats arrivent à la clôture.
     </p>
     ${blocks}`,
  );

  const text = `Le récap de tes votes, ${pseudo}\n\n${years
    .map((y) => {
      const lines = [`${y.year}`];
      if (y.anime) lines.push(`  Anime : ${y.anime}`);
      y.podium.forEach((label, i) => lines.push(`  ${i + 1}. ${label}`));
      return lines.join('\n');
    })
    .join('\n\n')}\n\n${SITE}`;

  await send(email, 'Le récap de tes votes — Retro Awards', html, text);
}
