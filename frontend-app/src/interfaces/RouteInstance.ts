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
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
