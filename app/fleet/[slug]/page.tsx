interface PageProps {
  params: {
    slug: string;
  };
}

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import "dotenv/config";

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  const fetchShipData = async () => {
    const res = await fetch(`https://rest.fnar.net/ship/ships/wit.iwfa`, {
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.TOKEN}`,
        cache: "no-store",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const fetchFuelData = async () => {
    const res = await fetch(`https://rest.fnar.net/ship/ships/fuel/wit.iwfa`, {
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.TOKEN}`,
        cache: "no-store",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const fetchFlightData = async () => {
    const res = await fetch(`https://rest.fnar.net/ship/flights/wit.iwfa`, {
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.TOKEN}`,
        cache: "no-store",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const shipData = await fetchShipData();
  const fuelData = await fetchFuelData();
  const flightData = await fetchFlightData();
  const shipNameToFilter = [`${slug}`];

  const filteredShipData = shipData.filter((item: any) =>
    shipNameToFilter.includes(item.Name)
  );

  const filteredFuelData = fuelData.filter((item: any) =>
    shipNameToFilter.includes(item.Name)
  );
  const stlFuelType = "STL_FUEL_STORE";
  const stlFuelStore = filteredFuelData.filter((item: any) =>
    stlFuelType.includes(item.Type)
  );
  const ftlFuelType = "FTL_FUEL_STORE";
  const ftlFuelStore = filteredFuelData.filter((item: any) =>
    ftlFuelType.includes(item.Type)
  );

  const filteredFlightIds = filteredShipData.map((item: any) => item.FlightId);
  const filterFlightData = flightData.filter((item: any) =>
    filteredFlightIds.includes(item.FlightId)
  );

  const fetchStorageData = async () => {
    const res = await fetch(
      `https://rest.fnar.net/storage/wit.iwfa/${filteredShipData[0].StoreId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `${process.env.TOKEN}`,
          cache: "no-store",
        },
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const StoreData = await fetchStorageData();
  //console.log(filteredShipData);
  //console.log(filteredFuelData);
  //console.log(filteredFlightIds)
  //console.log(filterFlightData[0]);
  //console.log(filterFlightData[0].Segments[4])
  //console.log(StoreData)
  //console.log(stlFuelStore)
  //console.log(ftlFuelStore)
  //console.log(filterFlightData[0].CurrentSegmentIndex)
  //console.log(filteredShipData[0].Location)
  const status = filteredShipData[0].Location
    ? `Docking At ${filteredShipData[0].Location}`
    : "In Transit";

  let sortedSegments: any[] = [];

  if (filterFlightData.length !== 0) {
    // Sort segments by DepartureTimeEpochMs
    sortedSegments = [...filterFlightData[0].Segments].sort(
      (a, b) => a.DepartureTimeEpochMs - b.DepartureTimeEpochMs
    );
  }

  const formatTime = (epochMs: any) => {
    return moment(epochMs).fromNow(); // Use `fromNow()` for relative time
  };

  const getDistance = (stlDistance: any, ftlDistance: any) => {
    return stlDistance !== null
      ? `${Math.round(stlDistance).toLocaleString()} Km`
      : ftlDistance !== null && ftlDistance !== "null"
      ? `${Math.round(ftlDistance)} Parsec`
      : "N/A";
  };

  //console.log(sortedSegments)

  return (
    <main className="flex min-h-screen items-center justify-center py-24 px-4">
      <div className="flex flex-col xl:flex-row xl:grid xl:grid-cols-1 gap-2 z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <Card className="w-full max-w-4xl shadow-lg border-2 border-muted-foreground rounded-3xl">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <RocketIcon className="w-6 h-6" />
                <h3 className="text-lg font-semibold">
                  {filteredShipData[0].Name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RadarIcon className="w-5 h-5" />
                <span>{filteredShipData[0].Registration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FlagIcon className="w-5 h-5" />
              <span>{status}</span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    WeightCapacity (t)
                  </span>
                  <span className="text-sm font-medium">
                    {StoreData.WeightLoad} / {StoreData.WeightCapacity}
                  </span>
                </div>
                <Progress
                  value={
                    (StoreData.WeightLoad / StoreData.WeightCapacity) * 100
                  }
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    VolumeCapacity (m³)
                  </span>
                  <span className="text-sm font-medium">
                    {StoreData.VolumeLoad} / {StoreData.VolumeCapacity}
                  </span>
                </div>
                <Progress
                  value={
                    (StoreData.VolumeLoad / StoreData.VolumeCapacity) * 100
                  }
                  className="w-full bg-muted"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">STL fuel Tank</span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (stlFuelStore[0].VolumeLoad /
                        stlFuelStore[0].VolumeCapacity) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (stlFuelStore[0].VolumeLoad /
                      stlFuelStore[0].VolumeCapacity) *
                    100
                  }
                  className="w-full bg-muted"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-sm font-medium">
                    {(Math.round(stlFuelStore[0].WeightLoad) * 100) / 100} /{" "}
                    {stlFuelStore[0].WeightCapacity} t
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Volume</span>
                  <span className="text-sm font-medium">
                    {(Math.round(stlFuelStore[0].VolumeLoad) * 100) / 100} /{" "}
                    {stlFuelStore[0].VolumeCapacity} m³
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">FTL fuel tank</span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (ftlFuelStore[0].VolumeLoad /
                        ftlFuelStore[0].VolumeCapacity) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (ftlFuelStore[0].VolumeLoad /
                      ftlFuelStore[0].VolumeCapacity) *
                    100
                  }
                  className="w-full bg-muted"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-sm font-medium">
                    {(Math.round(ftlFuelStore[0].WeightLoad) * 100) / 100} /{" "}
                    {ftlFuelStore[0].WeightCapacity} t
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Volume</span>
                  <span className="text-sm font-medium">
                    {(Math.round(ftlFuelStore[0].VolumeLoad) * 100) / 100} /{" "}
                    {ftlFuelStore[0].VolumeCapacity} m³
                  </span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <h4 className="text-lg font-semibold">Flight Path</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-muted shadow-sm">
                    <th className="py-2 text-left">#</th>
                    <th className="py-2 text-left">Type</th>
                    <th className="py-2 text-left">Destination</th>
                    <th className="py-2 text-left">Duration</th>
                    <th className="py-2 text-left">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSegments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-2 text-center">
                        No flight data available.
                      </td>
                    </tr>
                  ) : (
                    sortedSegments.map((segment: any, index: any) => (
                      <tr
                        key={index}
                        className={`border-b border-muted shadow-sm ${
                          moment().valueOf() > segment.ArrivalTimeEpochMs
                            ? "line-through"
                            : ""
                        }`}
                      >
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{segment.Type}</td>
                        <td className="py-2">{segment.Destination}</td>
                        <td className="py-2">
                          {formatTime(segment.ArrivalTimeEpochMs)}
                        </td>
                        <td className="py-2">
                          {getDistance(
                            segment.StlDistance,
                            segment.FtlDistance
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4">
              <h4 className="text-lg font-semibold">Estimated Landing Time</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Estimated Landing Time:
                </span>
                <span className="text-sm font-medium">
                  {filterFlightData.length > 0 &&
                  filterFlightData[0] &&
                  filterFlightData[0].ArrivalTimeEpochMs !== undefined
                    ? formatTime(filterFlightData[0].ArrivalTimeEpochMs)
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function RadarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <path d="m13.41 10.59 5.66-5.66" />
    </svg>
  );
}

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default Page;
