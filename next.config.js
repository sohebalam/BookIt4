const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DB: "mongodb+srv://SebAlam:Mmilo123@cluster0.lb1qj.mongodb.net/bookit?retryWrites=true&w=majority",
        CLOUDINARY_CLOUD_NAME: "dfreqlhvc",
        CLOUDINARY_API_KEY: "765885894368911",
        CLOUDINARY_API_SECRET: "_kxbMRYiZy7UN_qVM8E3FndXTOg",
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
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
  }
}
