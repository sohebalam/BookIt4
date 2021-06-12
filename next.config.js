const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DB: "mongodb+srv://SebAlam:Mmilo123@cluster0.lb1qj.mongodb.net/bookit?retryWrites=true&w=majority",
        CLOUDINARY_CLOUD_NAME: "dfreqlhvc",
        CLOUDINARY_API_KEY: "765885894368911",
        CLOUDINARY_API_SECRET: "_kxbMRYiZy7UN_qVM8E3FndXTOg",
        STRIPE_API_KEY:
          "pk_test_51H3gVIARrn8JZG3gx2b4WTqj6pl7AsVTUfY3e8u8u8vdRnZ4uCGrFOOD0wbm1lubTqMbQxlZtpPIjx49EXY8MNpo00BzYLddFg",
        STRIPE_SECRET_KEY:
          "sk_test_51H3gVIARrn8JZG3gwQWW62G9iesk1qzmlKgQCkPbGSRbPLDefCHCysoUt6g9fU8CtRvUMLVygSry0oJloByXisFl00ZyhHxNGL",
        STRIPE_WEBHOOK_SECRET: "whsec_bHeASlKGX6u1jRhXFLjEVrgBwIfJpFnC",
      },
      images: {
        domains: ["res.cloudinary.com"],
      },
      SMTP_HOST: "smtp.mailtrap.io",
      SMTP_PORT: "2525",
      SMTP_USER: "318ae13e7afbe9",
      pSMTP_PASSWORD: "16a8204064797d",
      STMP_FROM_NAME: "BookIT",
      STMP_FROM_EMAIL: "noreply@bookit.com",
    }
  }
  return {
    env: {
      DB: "mongodb+srv://SebAlam:Mmilo123@cluster0.lb1qj.mongodb.net/bookit?retryWrites=true&w=majority",
      CLOUDINARY_CLOUD_NAME: "dfreqlhvc",
      CLOUDINARY_API_KEY: "765885894368911",
      CLOUDINARY_API_SECRET: "_kxbMRYiZy7UN_qVM8E3FndXTOg",
      STRIPE_API_KEY:
        "pk_test_51H3gVIARrn8JZG3gx2b4WTqj6pl7AsVTUfY3e8u8u8vdRnZ4uCGrFOOD0wbm1lubTqMbQxlZtpPIjx49EXY8MNpo00BzYLddFg",
      STRIPE_SECRET_KEY:
        "sk_test_51H3gVIARrn8JZG3gwQWW62G9iesk1qzmlKgQCkPbGSRbPLDefCHCysoUt6g9fU8CtRvUMLVygSry0oJloByXisFl00ZyhHxNGL",
      STRIPE_WEBHOOK_SECRET: "whsec_XxWu2zvLUYk1V2m4ut1tC4Ad3RpXqSh0",
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "318ae13e7afbe9",
    pSMTP_PASSWORD: "16a8204064797d",
    STMP_FROM_NAME: "BookIT",
    STMP_FROM_EMAIL: "noreply@bookit.com",
    NEXTAUTH_URL: "https://bookit.vercel.app",
  }
}
