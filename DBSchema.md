#### Creating DB (DB name is portal)

    use portal
    
#### Creating collection (Collection name is donors)

    db.createCollection("donors")

#### Creating 2d geoSpatialIndex

    db.donors.createIndex({'location': '2d'})

#### Donor Model
```
{
    _id: ObjectId,
    name: string,
    phone: string,
    address: string,
    email: string,
    group: string,
    location: [ longitude, latitude ],
    date: Date
}


```

#### inserting into donors collection

    db.donors.insert(DonorModel)

#### querying donors collection with radius and location
```
db.donors.find({
    location: {
        $near: [longitude, latitude],
        $maxDistance: Number (metres)
    },
    group: string
})
```

