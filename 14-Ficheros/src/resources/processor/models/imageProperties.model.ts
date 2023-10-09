import * as sharp from 'sharp'

export interface ImageProperties {
  convertProperties: {
    format: keyof sharp.FormatEnum
    options?:
      | sharp.OutputOptions
      | sharp.JpegOptions
      | sharp.PngOptions
      | sharp.WebpOptions
      | sharp.AvifOptions
      | sharp.HeifOptions
      | sharp.JxlOptions
      | sharp.GifOptions
      | sharp.Jp2Options
      | sharp.TiffOptions
  }
  resizeProperties: {
    width?: number
    height?: number
    options?: {
      width?: number | undefined
      height?: number | undefined
      fit?: keyof sharp.FitEnum | undefined
      position?: number | string | undefined
      background?: sharp.Color | undefined
      kernel?: keyof sharp.KernelEnum | undefined
      withoutEnlargement?: boolean | undefined
      withoutReduction?: boolean | undefined
      fastShrinkOnLoad?: boolean | undefined
    }
  }
  cropProperties: {
    left: number
    top: number
    width: number
    height: number
  }
}
