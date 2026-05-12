export interface LeonConfig {
  image: string
  containerClassName: string
  imageClassName: string
}

export const leonConfigs: Record<string, LeonConfig> = {
  '/mis-predicciones': {
    image: '/leon-base.png',
    containerClassName: `
      hidden md:flex
      translate-x-[10%]
      md:translate-x-[20%]
      lg:translate-x-[30%]
    `,
    imageClassName: `
      w-40 h-40
      sm:w-56 sm:h-56
      md:w-75 md:h-75
      lg:w-[500px] lg:h-[500px]
      xl:w-[700px] xl:h-[700px]
    `,
  },

  '/fixture': {
  image: '/leon-fixture.png',
  containerClassName: `
    hidden md:flex
    -translate-x-[15%]
    md:translate-x-[-5%]
    lg:translate-x-[-30%]
  `,
  imageClassName: `
    scale-x-[-1]
    w-32 h-32
    sm:w-48 sm:h-48
    md:w-[350px] md:h-[350px]
    lg:w-[700px] lg:h-[700px]
  `,
},

  '/auth': {
    image: '/leon-login.png',
    containerClassName: `
      hidden md:flex
      translate-x-0
      md:translate-x-[10%]
      lg:translate-x-[25%]
    `,
    imageClassName: `
      w-28 h-28
      sm:w-40 sm:h-40
      md:w-[300px] md:h-[300px]
      lg:w-[550px] lg:h-[550px]
    `,
  },
}