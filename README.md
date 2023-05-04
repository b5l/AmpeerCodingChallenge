# Task 2a: Architecture

## Framework

NestJS will be used as a framework, because it's perfect for writing APIs. Its module based approach forces the developer into writing clean code that can be unit-tested fairly easily. It also provides a native module for integrating with MongoDB.

## Data ingestion

The data will be stored in a MongoDB database instance. Due to the quite uncomplicated data structure with no relations, a document based database engine is used. To work with the data conveniently in code, mongoose will be used.

For ensuring high performance and to avoid overloading the database server, we are going to use an HTTP middleware that caches data in-memory for a short time.

## API Layer

The API layer exposes endpoints for querying and updating the data. While GraphQL might be a better choice here in regards of filtering and aggregating data, I will implement it using REST since that's where I have the most experience with.

The endpoints will look like this:

```GET /api/v1/methane          # The endpoint specifies the specific queried resource
                                # Query parameters:
    ?page=1                     # Used for pagination, since esults are limited to 50 per page
    &startDate=1683219246734    # startDate: Numerical timestmap. Return only results with start date higher than this value
    &endDate=1683219267900      # endDate: Numberical timestamp. Return only results with end date lower than this value
    &minAvg=1000                # minAvg: Return only results with average higher than this value
    &aggregate=sum              # aggregate: Specify an aggregate function for aggregating the averages from the filtered result set
```

## Caching

For ensuring the ability to handle a large amount of requests, an HTTP Middleware caching GET requests will be implemented

## Scaling

The whole application should be stateless so it can be scaled up horizontally in combination with a load balancer like haproxy or traefik, as long as all instances are configured to use the same database.

## Streaming

To allow for real-time streaming of the data, we are going to expose a websocket endpoint that can be subscribed to.

## Error handling

To ensure that the system is robust and handles errors gracefully, we are streaming our logs to a log aggregator and monitoring them using a dashboard. For this, Prometheus and Grafana can be used.

Also, clean code & a strict architecture will help us to either avoid some errors completely, or to handle them gracefully.
