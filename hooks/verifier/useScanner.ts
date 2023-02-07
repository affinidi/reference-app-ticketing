import { MutableRefObject, useEffect, useRef } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import { Exception, Result } from '@zxing/library'

type useScannerParams = {
  delay?: number
  onError: (error: Exception) => void
  onScanned: (result: Result | undefined) => Promise<void>
  constraints?: MediaTrackConstraints
  videoElementId: string
}

const hints = new Map<number, any>()
hints.set(0, true)

export const useScanner = ({
  constraints = { facingMode: 'environment' },
  delay = 1000,
  videoElementId,
  onScanned,
  onError,
}: useScannerParams) => {
  const controlsRef: MutableRefObject<IScannerControls | null> = useRef(null)

  useEffect(() => {
    if (!isMediaDevicesSupported() && isValidType(onScanned, 'onScanned', 'function')) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"'
      onError(new Exception(message))
      return
    }
    if (!constraints) {
      return
    }

    const scanner = new BrowserQRCodeReader(hints, {
      delayBetweenScanAttempts: delay,
    })
    scanner
      .decodeFromConstraints({ video: constraints }, videoElementId, async (result, error) => {
        if (error) {
          // switch (error.name) {
          //   case 'NotFoundException' || 'FormatException':
          //     break
          //   case 'ChecksumException':
          //     onError(new Exception(`QR Code not recognized with ${error}. Please try again.`))
          //     break
          //   default:
          //     onError(new Exception(`scanned failed with error: ${error}. Please try again.`))
          // }
          return
        }

        await onScanned(result)
      })
      .then((controls: IScannerControls) => (controlsRef.current = controls))
      .catch(onError)

    return () => {
      controlsRef.current?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScanned, onError, videoElementId])
}

export type UseScannerType = ReturnType<typeof useScanner>

function isMediaDevicesSupported() {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices
}

function isValidType(value: any, name: string, type: string) {
  return typeof value === type
}
