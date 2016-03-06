import expect from 'expect';

import FileSizeFormatter from '../file-size-formatter';

describe('FileSizeFormater', () => {
    it('should handle missing input', () => {
        expect(FileSizeFormatter.humanize()).toBe('0 Bytes');
    });

    it('should format 1 bytes', () => {
        expect(FileSizeFormatter.humanize(1)).toBe('1 Bytes');
    });

    it('should format 1023 bytes', () => {
        expect(FileSizeFormatter.humanize(1023)).toBe('1023 Bytes');
    });

    it('should format 1 KB', () => {
        expect(FileSizeFormatter.humanize(1024)).toBe('1.00 Kb');
    });

    it('should format 1023 KB', () => {
        expect(FileSizeFormatter.humanize(1023 * 1024)).toBe('1023.00 Kb');
    });

    it('should format 1 MB', () => {
        expect(FileSizeFormatter.humanize(1024 * 1024)).toBe('1.00 Mb');
    });

    it('should format 1023 MB', () => {
        expect(FileSizeFormatter.humanize(1023 * 1024 * 1024)).toBe('1023.00 Mb');
    });

    it('should format 1 GB', () => {
        expect(FileSizeFormatter.humanize(1024 * 1024 * 1024)).toBe('1.00 Gb');
    });

    it('should format 1023 GB', () => {
        expect(FileSizeFormatter.humanize(1023 * 1024 * 1024 * 1024)).toBe('1023.00 Gb');
    });

    it('should format 1 TB', () => {
        expect(FileSizeFormatter.humanize(1024 * 1024 * 1024 * 1024)).toBe('1.00 Tb');
    });

    it('should format 1023 TB', () => {
        expect(FileSizeFormatter.humanize(1023 * 1024 * 1024 * 1024 * 1024)).toBe('1023.00 Tb');
    });

    it('should format 1024 TB', () => {
        expect(FileSizeFormatter.humanize(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1024.00 Tb');
    });
});
