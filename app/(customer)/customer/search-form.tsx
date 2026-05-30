"use client";

import { useMemo, useRef, useState } from "react";

type CountryOption = {
  id: string;
  name: string;
  code: string;
};

type CityOption = {
  id: string;
  name: string;
  countryId: string;
};

type LocationOption = {
  id: string;
  cityId: string;
  label: string;
};

type RouteOption = {
  originLocationId: string;
  destinationLocationId: string;
};

type CustomerSearchFormProps = {
  countries: CountryOption[];
  cities: CityOption[];
  locations: LocationOption[];
  routes: RouteOption[];
  debugEnabled?: boolean;
  initialValues: {
    countryId: string;
    cityId: string;
    fromLocationId: string;
    toLocationId: string;
    travelDate: string;
    passengerCount: number;
  };
};

function formatDisplayDate(value: string) {
  if (!value) return "Choose date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function searchSignature(
  countryId: string,
  cityId: string,
  fromLocationId: string,
  toLocationId: string,
  travelDate: string,
  passengerCount: string,
) {
  return [countryId, cityId, fromLocationId, toLocationId, travelDate, passengerCount].join("|");
}

export function CustomerSearchForm({
  countries,
  cities,
  locations,
  routes,
  debugEnabled = false,
  initialValues,
}: CustomerSearchFormProps) {
  const [countryId, setCountryId] = useState(initialValues.countryId);
  const [cityId, setCityId] = useState(initialValues.cityId);
  const [fromLocationId, setFromLocationId] = useState(initialValues.fromLocationId);
  const [toLocationId, setToLocationId] = useState(initialValues.toLocationId);
  const [travelDate, setTravelDate] = useState(initialValues.travelDate);
  const [passengerCount, setPassengerCount] = useState(String(initialValues.passengerCount || 1));
  const dateInputRef = useRef<HTMLInputElement>(null);

  const availableCities = useMemo(() => cities.filter((city) => city.countryId === countryId), [cities, countryId]);

  const availableFromLocations = useMemo(
    () =>
      locations.filter(
        (location) =>
          location.cityId === cityId && routes.some((route) => route.originLocationId === location.id),
      ),
    [locations, routes, cityId],
  );

  const availableToLocations = useMemo(() => {
    const destinationIds = new Set(
      routes
        .filter((route) => route.originLocationId === fromLocationId)
        .map((route) => route.destinationLocationId),
    );
    return locations.filter((location) => location.cityId === cityId && destinationIds.has(location.id));
  }, [cityId, fromLocationId, locations, routes]);

  const hasCountry = countryId.length > 0;
  const hasCity = cityId.length > 0;
  const hasFrom = fromLocationId.length > 0;
  const hasTo = toLocationId.length > 0;
  const canSearch = hasCountry && hasCity && hasFrom && hasTo && travelDate.length > 0 && Number(passengerCount) > 0;
  const currentSearchSignature = searchSignature(countryId, cityId, fromLocationId, toLocationId, travelDate, passengerCount);
  const clearSubmittedSearch = () => {
    const results = document.getElementById("search-results");
    results?.setAttribute("hidden", "");
    const url = new URL(window.location.href);
    url.searchParams.delete("searched");
    url.searchParams.delete("searchSignature");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };
  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input || input.disabled) return;
    input.showPicker?.();
    input.focus();
  };

  return (
    <form className="search-hierarchy form-grid" action="/customer#search-results">
      <input type="hidden" name="searched" value="true" />
      <input type="hidden" name="searchSignature" value={currentSearchSignature} />
      {debugEnabled && <input type="hidden" name="debug" value="true" />}
      <label>
        Country
        <select
          name="countryId"
          value={countryId}
          required
          onChange={(event) => {
            clearSubmittedSearch();
            setCountryId(event.target.value);
            setCityId("");
            setFromLocationId("");
            setToLocationId("");
          }}
        >
          <option value="">Choose country</option>
          {countries.map((country) => (
            <option value={country.id} key={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        City
        <select
          name="cityId"
          value={cityId}
          disabled={!hasCountry}
          required
          onChange={(event) => {
            clearSubmittedSearch();
            setCityId(event.target.value);
            setFromLocationId("");
            setToLocationId("");
          }}
        >
          <option value="">Choose city</option>
          {availableCities.map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        From
        <select
          name="fromLocationId"
          value={fromLocationId}
          disabled={!hasCity}
          required
          onChange={(event) => {
            clearSubmittedSearch();
            setFromLocationId(event.target.value);
            setToLocationId("");
          }}
        >
          <option value="">Choose pickup location</option>
          {availableFromLocations.map((location) => (
            <option value={location.id} key={location.id}>
              {location.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        To
        <select
          name="toLocationId"
          value={toLocationId}
          disabled={!hasFrom}
          required
          onChange={(event) => {
            clearSubmittedSearch();
            setToLocationId(event.target.value);
          }}
        >
          <option value="">Choose destination</option>
          {availableToLocations.map((location) => (
            <option value={location.id} key={location.id}>
              {location.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date
        <span className="date-control" onClick={openDatePicker}>
          <span className="date-value">{formatDisplayDate(travelDate)}</span>
          <input
            ref={dateInputRef}
            name="travelDate"
            type="date"
            lang="en-US"
            value={travelDate}
            disabled={!hasTo}
            required
            onChange={(event) => {
              clearSubmittedSearch();
              setTravelDate(event.target.value);
            }}
          />
        </span>
      </label>

      <div className="action-row">
        <label>
          Passengers
          <input
            name="passengerCount"
            type="number"
            min="1"
            value={passengerCount}
            disabled={!hasTo}
            required
            onChange={(event) => {
              clearSubmittedSearch();
              setPassengerCount(event.target.value);
            }}
          />
        </label>

        <button type="submit" disabled={!canSearch}>
          Find {"\u2192"}
        </button>
      </div>
    </form>
  );
}
