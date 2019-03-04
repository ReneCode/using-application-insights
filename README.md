# Using Azure Application Insights

## Preparation

- create an `Application Insights` in Azure.
- get the `Instumentation Key` in the Overview page
- put that key into a `.env` file

<!-- prettier-ignore -->
    # .env
    INSTRUMENTATION_KEY=1234-1234-1234-1234

## Usage

Start the sample web server.

- npm install
- npm run start

Start requesting that server.

- npm run createdata

## Monitoring / Analysing

There is a time gap between writing to Application Insights from the server-app and seeing that data in the Azure portal. (up to 15 minutes). So after a while...

Open the Application Insights in the Azure portal and to to Analytics. Enter the following in the query field:

    requests
    | where timestamp  > ago(1h)
    | summarize cnt = sum(itemCount) by bin(timestamp, 1m)
    | order by cnt
    | render barchart kind=default

You will get something like this:

[requests of the last 1 hour](requests.png)

Try out this:

    traces
    | where timestamp  > ago(1h)
    | where tostring(customDimensions.name ) != ""
    | summarize cnt = count()  by tostring(customDimensions.name)
    | order by cnt
    | render piechart

Your will get a file pie chart:

[distribution of the names](piechart.png)
