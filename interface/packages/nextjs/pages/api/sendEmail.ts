import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import logger from "~~/services/logger/logger";

const AUTH_EMAIL = process.env.AUTH_EMAIL;
const AUTH_EMAIL_PASS = process.env.AUTH_EMAIL_PASS;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, otp } = req.body;

    const OTP_Template = `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
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
	<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <!-- <title>Confirm your email address</title> -->
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
			.p-0 {
				padding:0px!important;
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
			.p-0 {
				padding:0px!important;
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
													Confirm Your email Address
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
								<tr><td height="64" style="height:64px; font-size:1px; line-height:1px">&nbsp;</td></tr>
								<tr>
									<td style="padding:0px 24px">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="padding:0px 114px" class="p-0">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td style="font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:16px; font-weight:normal; color:#ffffff; line-height:1.5; text-align:center; text-transform:uppercase;">
																Please enter the following verification code for verification
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr><td height="48" style="height:48px; font-size:1px; line-height:1px">&nbsp;</td></tr>
											<tr>
												<td style="padding:0px 0px 24px 0px; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:24px; font-weight:normal; color:#35D2E2; line-height:1.33; text-align:center; text-transform:uppercase; letter-spacing:-0.04em;" class="f-20">
													Your Verification<br/>
													Code
												</td>
											</tr>
											<tr>
												<td>
													<table align="center" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td style="border:2px solid #35D2E2; padding:24px 73px; border-radius:12px; font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:24px; font-weight:normal; color:#ffffff; line-height:1.17; text-align:center; text-transform:uppercase; letter-spacing:-0.04em;">
																${otp}
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr><td height="32" style="height:32px; font-size:1px; line-height:1px">&nbsp;</td></tr>
											<tr>
												<td style="font-family: 'Lato', Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; font-size:12px; font-weight:normal; color:#A4A9C7; line-height:2; text-align:center; text-transform:uppercase;">
													If you didn’t request<br/>this email please ignore.
												</td>
											</tr>
											<tr><td height="80" style="height:80px; font-size:1px; line-height:1px">&nbsp;</td></tr>
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

    if (!email || !email.length) {
        return res.status(400).json({
            error: "Forgot to add your email?",
        });
    }

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
        subject: "OTP for Chainwarz Subscription",
        html: OTP_Template,
    };

    // await transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(error);
            return res.status(400).json({
                error: error.message,
            });
        } else {
            logger.info("Email sent: " + info.response);
            return res.status(200).json({ error: null });
        }
    });
};
