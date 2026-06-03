export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { tech, client, date, type, scheme, materials } = req.body;
    const matList = (materials || []).map(m => '<tr><td style="padding:6px 12px;border-bottom:1px solid #eee">' + m.name + '</td><td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600">' + m.qty + ' ' + m.unit + '</td></tr>').join('');
    const html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><div style="background:#1a1d27;color:#fff;padding:20px;border-radius:12px 12px 0 0"><h2>Nueva Instalacion - ' + client + '</h2></div><div style="background:#f8f9fa;padding:20px;border:1px solid #e0e0e0"><p><b>Tecnico:</b> ' + tech + '</p><p><b>Fecha:</b> ' + date + '</p><p><b>Tipo:</b> ' + type + '</p><p><b>Esquema:</b> ' + (scheme ? 'Esquema ' + scheme : 'Libre') + '</p><h3>Materiales (' + (materials||[]).length + ')</h3><table style="width:100%;border-collapse:collapse;background:#fff">' + matList + '</table></div></div>';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'ElecTrack <onboarding@resend.dev>', to: process.env.ADMIN_EMAIL || 'pastorluis2001@gmail.com', subject: 'Nueva instalacion: ' + client + ' (' + tech + ')', html })
    });
    if (!response.ok) return res.status(500).json({ error: 'Email failed' });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
}
