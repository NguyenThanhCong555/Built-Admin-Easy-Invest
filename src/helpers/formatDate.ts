class _ConvertDate {
  convertDateToMilliseconds(date: Date) {
    return Math.floor(date.getTime());
  }
  convertDateToSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000.0);
  }
  // convert unix timestamp to milliseconds
  convertMilliseconds(ts) {
    return ts * 1000;
  }
  // initialize new Date object
  createNewDate(ts): Date {
    const ts_ms = this.convertMilliseconds(ts);
    return new Date(ts_ms);
  }
  // year as 4 digits (YYYY)
  getYear(date_ob: Date) {
    return date_ob.getFullYear();
  }
  // month as 2 digits (MM)
  getMonth(date_ob: Date) {
    return ('0' + (date_ob.getMonth() + 1)).slice(-2);
  }
  // date as 2 digits (DD)
  getDate(date_ob: Date) {
    return ('0' + date_ob.getDate()).slice(-2);
  }
  // hours as 2 digits (hh)
  getHours(date_ob: Date) {
    return ('0' + date_ob.getHours()).slice(-2);
  }
  // minutes as 2 digits (mm)
  getMinutes(date_ob: Date) {
    return ('0' + date_ob.getMinutes()).slice(-2);
  }
  // seconds as 2 digits (ss)
  getSeconds(date_ob: Date) {
    return ('0' + date_ob.getSeconds()).slice(-2);
  }

  getDDMMYY(date_ob: Date) {
    return this.getDate(date_ob) + '-' + this.getMonth(date_ob) + '-' + this.getYear(date_ob);
  }

  GetDDMMYY_HHMMSS(date_ob: Date) {
    return (
      this.getDate(date_ob) +
      '-' +
      this.getMonth(date_ob) +
      '-' +
      this.getYear(date_ob) +
      ' ' +
      this.getHours(date_ob) +
      ':' +
      this.getMinutes(date_ob) +
      ':' +
      this.getSeconds(date_ob)
    );
  }

  GetHHMMSS_DDMMYY(date_ob: Date) {
    return (
      this.getHours(date_ob) +
      ':' +
      this.getMinutes(date_ob) +
      ' ' +
      this.getDate(date_ob) +
      '/' +
      this.getMonth(date_ob) +
      '/' +
      this.getYear(date_ob)
    );
  }
}

const ConvertDate = new _ConvertDate();
export default ConvertDate;
