import {
  ExternalVideo,
  Image,
  ModelViewer,
  Video,
  type ShopifyImageProps
} from '@shopify/hydrogen/client'
import type {
  ExternalVideo as ExternalVideoType,
  MediaEdge as MediaEdgeType,
  MediaImage as MediaImageType,
  Model3d as Model3dType,
  Video as VideoType
} from '@shopify/hydrogen/storefront-api-types'
import React from 'react'
import type { PartialDeep } from 'type-fest'
//import { ExternalVideo } from '../ExternalVideo/index.js'

export interface MediaFileProps {
  /** An object with fields that correspond to the Storefront API's [Media object](https://shopify.dev/api/storefront/reference/products/media). */
  data: PartialDeep<MediaEdgeType['node']>
  /** The options for the `Image`, `Video`, or `ExternalVideo` components. */
  options?:
    | ShopifyImageProps
    | React.ComponentProps<typeof Video>['previewImageOptions']
    | React.ComponentProps<typeof ExternalVideo>['options']
}

/**
 * The `MediaFile` component renders the media for the Storefront API's
 * [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, a
 * `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `mediaContentType` of the
 * `media` provided as a prop.
 */
export function MediaFile({
  data,
  options,
  ...passthroughProps
}: MediaFileProps) {
  switch (data.mediaContentType) {
    case 'IMAGE': {
      const dataImage = (data as PartialDeep<MediaImageType>)
        .image as ShopifyImageProps['data']
      if (!dataImage || !dataImage.url) {
        console.warn(
          `No "image" property was found on the "data" prop for <MediaFile/>, for the "type='image'"`
        )
        return null
      }
      return (
        <Image
          {...passthroughProps}
          data={dataImage}
          loaderOptions={options as ShopifyImageProps}
        />
      )
    }
    case 'VIDEO':
      return (
        <Video
          {...passthroughProps}
          data={data as PartialDeep<VideoType>}
          previewImageOptions={
            options as React.ComponentProps<typeof Video>['previewImageOptions']
          }
        />
      )
    case 'EXTERNAL_VIDEO':
      return (
        <ExternalVideo
          {...passthroughProps}
          data={data as PartialDeep<ExternalVideoType>}
          options={
            options as React.ComponentProps<typeof ExternalVideo>['options']
          }
        />
      )
    case 'MODEL_3D':
      return (
        <ModelViewer
          {...passthroughProps}
          data={data as PartialDeep<Model3dType>}
        />
      )
    default:
      return null
  }
}
