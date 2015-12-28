export default class FileSizeFormatter {
    static humanize(bytes) {
        if (isNaN(bytes))
            bytes = 0;

        if (bytes < 1024)
            return bytes + ' Bytes';

        bytes /= 1024;

        if (bytes < 1024)
            return bytes.toFixed(2) + ' Kb';

        bytes /= 1024;

        if (bytes < 1024)
            return bytes.toFixed(2) + ' Mb';

        bytes /= 1024;

        if (bytes < 1024)
            return bytes.toFixed(2) + ' Gb';

        bytes /= 1024;

        return bytes.toFixed(2) + ' Tb';
    }
}