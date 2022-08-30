import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';

const uppyKey = '0701d3d7f8d94e92a65a9cba388b1d96';
const uppyBucket = 'cloud.taggbox.com';
const uppyAwsKey = '47ABVORKG52UYE1KB28S';
const uppyAwsSecret = 'pcaTfeokaz28geAAns08H3yaGbOVz6ILgTptu19v';



class UppyUpload {
    constructor(beforeFileAdded, beforeUpload) {
        this.uppy = new Uppy({
            meta: { type: 'avatar' },
            autoProceed: true,
            debug: true,
            allowMultipleUploads: true,
            restrictions: {
                maxFileSize: 104857600,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*', 'video/*']
            },
            onBeforeFileAdded: beforeFileAdded,
            onBeforeUpload: beforeUpload
        })

        this.uppy.use(Transloadit, {
            params: {
                auth: {
                    key: uppyKey
                },
                steps: {
                    store: {
                        robot: '/wasabi/store',
                        bucket_region: "us-west-1",
                        result: true,
                        bucket: uppyBucket,
                        key: uppyAwsKey,
                        secret: uppyAwsSecret,
                        path: 'onsiteupload/images/${file.id}'
                    }
                }
            },
            waitForEncoding: true
        })

    }
}

export default UppyUpload;