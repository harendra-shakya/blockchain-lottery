import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import logger from "~~/services/logger/logger";

const AUTH_EMAIL = process.env.AUTH_EMAIL;
const AUTH_EMAIL_PASS = process.env.AUTH_EMAIL_PASS;
function getRequestParams(email: string) {
    // get env variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    // get the mailchimp datacenter - mailchimp API keys always look like this:
    // c0e214879c8542a54e716f38edf1635d-us2
    // we need the us2 part
    const DATACENTER = process.env.MAILCHIMP_API_KEY!.split("-")[1];

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    // you can add aditional paramaters here. See full list of available paramaters at:
    // https://mailchimp.com/developer/reference/lists/list-members/
    const data = {
        email_address: email,
        status: "subscribed",
    };

    // API key needs to be encoded in base 64 format
    const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64ApiKey}`,
    };

    return {
        url,
        data,
        headers,
    };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email } = req.body;

        if (!email || !email.length) {
            return res.status(400).json({
                error: "Forgot to add your email?",
            });
        }

        const WELCOME_HTML = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="x-apple-disable-message-reformatting"/>
	<!-- disable auto telephone linking in iOS -->
	<meta name="format-detection" content="telephone=no">
	<!-- disable auto date linking in iOS -->
	<meta name="format-detection" content="date=no">
	<!-- disable auto address linking in iOS -->
	<meta name="format-detection" content="address=no">
	<!-- disable auto email linking in iOS -->
	<meta name="format-detection" content="email=no">
	<meta name="color-scheme" content="light">
	<meta name="supported-color-schemes" content="light">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
	<style type="text/css">
		:root {
			color-scheme: light;
			supported-color-schemes: light;
		}
		* {
			box-sizing: border-box;
		}
		body, table, tr, td, p, div {
			font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif;
		}
		.mcnPreviewText {
			display:none!important;
		}
		@media only screen and (max-width:480px) {
			.m-dw {
				width:100%!important;
				min-width:100%!important;
				height:auto!important;
			}
			.m-db {
				display:block!important;
			}
			.f-20 {
				font-size:20px!important;
			}
		}
	</style>
	<!--[if gte mso 9]>
	<xml>
	<o:OfficeDocumentSettings>
	<o:AllowPNG/>
	<o:PixelsPerInch>96</o:PixelsPerInch>
	</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	
	<!--[if mso]>
	<style type="text/css">
		body, tr, td, th, p, a {font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif !important;}
	</style>
	<![endif]-->
</head>
<body align="center" style="margin:0px; padding:0px; background-color:#ffffff">
	<style>
		@media (max-width:480px) {
			.m-dw {
				width:100%!important;
				min-width:100%!important;
				height:auto!important;
			}
			.m-db {
				display:block!important;
			}
			.f-20 {
				font-size:20px!important;
			}
		}
	</style>
	<!--*|IF:MC_PREVIEW_TEXT|*-->
	<!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]--> 
	<!--*|END:IF|*-->
	<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" class="m-dw">
		<tr>
			<td align="center">
				<table align="center" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#070123" style="border-radius:24px 24px 0px 0px; background: linear-gradient(48.73deg, #FF817D 0%, #8233FF 46.35%, #3857FD 63.02%, #22DEF1 100%);" class="m-dw">
					<tr>
						<td width="600" style="width:600px" class="m-dw">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding:0px 24px">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="padding:24px 0px; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:24px; font-weight:normal; color:#ffffff; line-height:1.33; text-align:center; text-transform:uppercase; letter-spacing:-0.04em;" class="f-20">
													Welcome to Chain Warz
												</td>
											</tr>
										</table>										
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" class="m-dw">
		<tr>
			<td align="center">
				<table align="center" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#070123" style="border-radius:0px 0px 24px 24px;" class="m-dw">
					<tr>
						<td width="600" style="width:600px" class="m-dw">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr><td height="48" style="height:48px; font-size:1px; line-height:1px">&nbsp;</td></tr>
								<tr>
									<td style="padding:0px 24px">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:24px; font-weight:normal; color:#ffffff; line-height:1.33; text-align:center; text-transform:uppercase; letter-spacing:-0.04em;" class="f-20">
													congratulations
												</td>
											</tr>
											<tr>
												<td style="padding:24px 0px 40px 0px; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:16px; font-weight:normal; color:#ffffff; line-height:1.5; text-align:center; text-transform:uppercase;">
													Your email has been successfully verified, and you're now a member of the Chain Warz community.<br/><br/>
													We're thrilled to have you on board and can't wait for you to dive into the world of thrilling blockchain battles and exclusive NFTs.
												</td>
											</tr>
											<tr>
												<td style="padding:0px 0px 14px 0px; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:24px; font-weight:normal; color:#ffffff; line-height:1.33; text-align:center; text-transform:uppercase; letter-spacing:-0.04em;" class="f-20">
													JOIN US
												</td>
											</tr>
											<tr>
												<td style="padding:0px 0px 90px 0px">
													<table align="center" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td valign="middle" style="padding:0px 12px">
																<a href="https://twitter.com/harendrashakya_" target="_blank" style="color:#ffffff; font-size:10px; text-decoration:none">
																<img
																	src="https://chainwarz.io/twitterGradient.svg"
																	alt="twitter"
																	width={64}
																	height={64}
																	style={{ width: "64px", maxWidth: "64px", display: "block" }}
																/>	
																</a>
															</td>
															<td valign="middle" style="padding:0px 12px">
																<a href="https://twitter.com/harendrashakya_" target="_blank" style="color:#ffffff; font-size:10px; text-decoration:none">
																<img
																	src="https://chainwarz.io/discordGradient.svg"
																	alt="discord"
																	width={64}
																	height={64}
																	style={{ width: "64px", maxWidth: "64px", display: "block" }}
																/>																
																</a>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td style="padding:24px 0px; border-top:1px solid #3B57EE; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:12px; font-weight:normal; color:#ffffff; line-height:1.5; text-align:center; text-transform:uppercase;">
													Need some help? Feel free to <a href="mailto:support@chainwarz.io" target="_blank" style="color:#35D2E2; text-decoration:underline">Contact us</a>
												</td>
											</tr>
										</table>										
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;

        try {
            const { url, data, headers } = getRequestParams(email);

            await axios.post(url, data, { headers });

            const transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                secure: true,
                auth: {
                    user: AUTH_EMAIL,
                    pass: AUTH_EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: AUTH_EMAIL,
                to: email,
                subject: "Welcome to Chain Warz",
                html: WELCOME_HTML,
            };

            // await transporter.sendMail(mailOptions);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    logger.error(error);
                    return res.status(400).json({
                        error: error.message,
                    });
                } else {
                    logger.info("Welcome Email sent: " + info.response);
                    return res.status(200).json({ error: null });
                }
            });

            // Success
            return res.status(200).json({ error: null });
        } catch (error) {
            logger.error(error);
            return res.status(400).json({
                error: `Oops, something went wrong..`,
            });
        }
    }
};
