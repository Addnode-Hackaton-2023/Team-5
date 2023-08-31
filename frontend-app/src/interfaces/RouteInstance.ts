export interface RouteInstance {
  routeInstanceId: Number;
  routeName: string;
  eta: Date;
  latestLatitude: Number;
  latestLongitude: Number;
  loadedWeight: Number;
  status: Status;
}

export enum Status {
  STARTED = "Pågående",
  FINISHED = "Avsluttet",
}
