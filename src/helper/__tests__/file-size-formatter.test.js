import chai from 'chai';

import FileSizeFormatter from '../file-size-formatter';

chai.should();

describe('FileSizeFormater', () => {
    it('should handle missing input', () => {
        FileSizeFormatter.humanize().should.equal('0 Bytes');
    });

    it('should format 1 bytes', () => {
        FileSizeFormatter.humanize(1).should.equal('1 Bytes');
    });

    it('should format 1023 bytes', () => {
        FileSizeFormatter.humanize(1023).should.equal('1023 Bytes');
    });

    it('should format 1 KB', () => {
        FileSizeFormatter.humanize(1024).should.equal('1.00 Kb');
    });

    it('should format 1023 KB', () => {
        FileSizeFormatter.humanize(1023 * 1024).should.equal('1023.00 Kb');
    });

    it('should format 1 MB', () => {
        FileSizeFormatter.humanize(1024 * 1024).should.equal('1.00 Mb');
    });

    it('should format 1023 MB', () => {
        FileSizeFormatter.humanize(1023 * 1024 * 1024).should.equal('1023.00 Mb');
    });

    it('should format 1 GB', () => {
        FileSizeFormatter.humanize(1024 * 1024 * 1024).should.equal('1.00 Gb');
    });

    it('should format 1023 GB', () => {
        FileSizeFormatter.humanize(1023 * 1024 * 1024 * 1024).should.equal('1023.00 Gb');
    });

    it('should format 1 TB', () => {
        FileSizeFormatter.humanize(1024 * 1024 * 1024 * 1024).should.equal('1.00 Tb');
    });

    it('should format 1023 TB', () => {
        FileSizeFormatter.humanize(1023 * 1024 * 1024 * 1024 * 1024).should.equal('1023.00 Tb');
    });

    it('should format 1024 TB', () => {
        FileSizeFormatter.humanize(1024 * 1024 * 1024 * 1024 * 1024).should.equal('1024.00 Tb');
    });
});
