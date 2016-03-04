export default class FileSizeFormatter {
    static humanize(bytes) {
        if (isNaN(bytes)) {
            return '0 Bytes';
        }

        let resultBytes = bytes;

        if (resultBytes < 1024) {
            return resultBytes + ' Bytes';
        }

        resultBytes /= 1024;

        if (resultBytes < 1024) {
            return resultBytes.toFixed(2) + ' Kb';
        }

        resultBytes /= 1024;

        if (resultBytes < 1024) {
            return resultBytes.toFixed(2) + ' Mb';
        }

        resultBytes /= 1024;

        if (resultBytes < 1024) {
            return resultBytes.toFixed(2) + ' Gb';
        }

        resultBytes /= 1024;

        return resultBytes.toFixed(2) + ' Tb';
    }
}
