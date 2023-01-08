export enum ViewMode {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export interface DateSetup {
  dates: Date[]
  viewMode: ViewMode
}
