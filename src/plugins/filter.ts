import moment from "moment"

export const filter = {
  date(date: string) {
    return moment(date).format("YYYY-MM-DD")
  },
}
// app.appContext.config.globalProperties.$filters = filter
