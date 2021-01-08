<!-- @format -->

# M001 - MongoDB Basics

Notes from [this course](https://university.mongodb.com/courses/M001/about) on MongoDB Basics.

## Quick Connect

```
mongo "mongodb+srv://<your cluster>.mongodb.net/sample_training" --username m001-student
```

## Commands/Operators

-  [find](https://docs.mongodb.com/manual/reference/command/find/)
-  [insert](https://docs.mongodb.com/manual/reference/command/insert/)
-  [update](https://docs.mongodb.com/manual/reference/command/update/)
-  [delete](https://docs.mongodb.com/manual/reference/command/delete/)

-  [Cursor Methods](https://docs.mongodb.com/manual/reference/method/js-cursor/index.html)

-  [$sort](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/index.html) & [cursor.sort()](https://docs.mongodb.com/manual/reference/method/cursor.sort/index.html)
-  [$limit](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/index.html) & [cursor.limit()](https://docs.mongodb.com/manual/reference/method/cursor.sort/index.html)

-  [drop collection](https://docs.mongodb.com/manual/reference/command/drop/index.html)

-  [Comparision Query Operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
-  [Logical Query Operators](https://docs.mongodb.com/manual/reference/operator/query-logical/)
-  [expr](https://docs.mongodb.com/manual/reference/operator/query/expr/)
-  [Array Query Operators](https://docs.mongodb.com/manual/reference/operator/query-array/)
-  [Querying Arrays](https://docs.mongodb.com/manual/tutorial/query-arrays/)
-  [regex](https://docs.mongodb.com/manual/reference/operator/query/regex/index.html)
-  Aggregation syntax vs MQL syntax

## Conceptual

-  [Aggregation](https://docs.mongodb.com/manual/aggregation/)
-  [Indexes](https://docs.mongodb.com/manual/indexes/index.html)
-  [Data Modeling](https://docs.mongodb.com/manual/core/data-modeling-introduction/)

## Tools

-  [Mongo Shell](https://docs.mongodb.com/manual/reference/method/)
-  [MongoDB Compass](https://www.mongodb.com/products/compass)

## Export/Import

Mongo Dump & Restore - BSON

```
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"
mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump
```

Mongo Export & Import - JSON

```
mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json
mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
```
