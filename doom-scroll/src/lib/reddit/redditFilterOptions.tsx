export enum SubredditSortOption {
    HOT = "hot",
    NEW = "new",
    TOP = "top",
    RISING = "rising",
}

export const SUBREDDIT_SORT_OPTIONS = {
    [SubredditSortOption.HOT]: "Hot",
    [SubredditSortOption.NEW]: "New",
    [SubredditSortOption.TOP]: "Top",
    [SubredditSortOption.RISING]: "Rising",
};

export enum SubredditTimeOption {
    HOUR = "hour",
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year",
    ALL = "all",
}
export const SUBREDDIT_TIME_OPTIONS = {
    [SubredditTimeOption.HOUR]: "Now",
    [SubredditTimeOption.DAY]: "Today",
    [SubredditTimeOption.WEEK]: "This Week",
    [SubredditTimeOption.MONTH]: "This Month",
    [SubredditTimeOption.YEAR]: "This Year",
    [SubredditTimeOption.ALL]: "All Time",
};

export enum SearchSortOption {
    RELEVANCE = "relevance",
    HOT = "hot",
    TOP = "top",
    NEW = "new",
    COMMENTS = "comments",
}

export const SEARCH_SORT_OPTIONS = {
    [SearchSortOption.RELEVANCE]: "Relevance",
    [SearchSortOption.HOT]: "Hot",
    [SearchSortOption.NEW]: "New",
    [SearchSortOption.TOP]: "Top",
    [SearchSortOption.COMMENTS]: "Most Comments",
};

export enum SearchTimeOption {
    ALL = "all",
    YEAR = "year",
    MONTH = "month",
    WEEK = "week",
    DAY = "day",
    HOUR = "hour",
}

export const SEARCH_TIME_OPTIONS = {
    [SearchTimeOption.ALL]: "All Time",
    [SearchTimeOption.YEAR]: "Past Year",
    [SearchTimeOption.MONTH]: "Past Month",
    [SearchTimeOption.WEEK]: "Past Week",
    [SearchTimeOption.DAY]: "Past 24 Hours",
    [SearchTimeOption.HOUR]: "Past Hour",
};

// export enum GeoOption {
//     GLOBAL = "GLOBAL",
//     US = "US",
//     AR = "AR",
//     AU = "AU",
//     BG = "BG",
//     CA = "CA",
//     CL = "CL",
//     CO = "CO",
//     HR = "HR",
//     CZ = "CZ",
//     FI = "FI",
//     FR = "FR",
//     DE = "DE",
//     GR = "GR",
//     HU = "HU",
//     IS = "IS",
//     IN = "IN",
//     IE = "IE",
//     IT = "IT",
//     JP = "JP",
//     MY = "MY",
//     MX = "MX",
//     NZ = "NZ",
//     PH = "PH",
//     PL = "PL",
//     PT = "PT",
//     PR = "PR",
//     RO = "RO",
//     RS = "RS",
//     SG = "SG",
//     ES = "ES",
//     SE = "SE",
//     TW = "TW",
//     TH = "TH",
//     TR = "TR",
//     GB = "GB",
// }

// export const GEO_OPTIONS = {
//     [GeoOption.GLOBAL]: "Everywhere",
//     [GeoOption.US]: "United States",
//     [GeoOption.AR]: "Argentina",
//     [GeoOption.AU]: "Australia",
//     [GeoOption.BG]: "Bulgaria",
//     [GeoOption.CA]: "Canada",
//     [GeoOption.CL]: "Chile",
//     [GeoOption.CO]: "Colombia",
//     [GeoOption.HR]: "Croatia",
//     [GeoOption.CZ]: "Czech Republic",
//     [GeoOption.FI]: "Findland",
//     [GeoOption.FR]: "France",
//     [GeoOption.DE]: "Germany",
//     [GeoOption.GR]: "Greece",
//     [GeoOption.HU]: "Hungary",
//     [GeoOption.IS]: "Iceland",
//     [GeoOption.IN]: "India",
//     [GeoOption.IE]: "Ireland",
//     [GeoOption.IT]: "Italy",
//     [GeoOption.JP]: "Japan",
//     [GeoOption.MY]: "Malaysia",
//     [GeoOption.MX]: "Mexico",
//     [GeoOption.NZ]: "New Zealand",
//     [GeoOption.PH]: "Philippines",
//     [GeoOption.PL]: "Poland",
//     [GeoOption.PT]: "Portugal",
//     [GeoOption.PR]: "Puerto Rico",
//     [GeoOption.RO]: "Romania",
//     [GeoOption.RS]: "Serbia",
//     [GeoOption.SG]: "Singapore",
//     [GeoOption.ES]: "Spain",
//     [GeoOption.SE]: "Sweden",
//     [GeoOption.TW]: "Taiwan",
//     [GeoOption.TH]: "Thailand",
//     [GeoOption.TR]: "Turkey",
//     [GeoOption.GB]: "United Kingdom",
// };
