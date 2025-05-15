erDiagram

  User ||--o{ Meme : creates
  User ||--o{ Comment : writes
  User ||--o{ Rating : rates
  User ||--o{ Favorite : bookmarks
  User ||--|| Membership : joins
  Meme ||--o{ Comment : receives
  Meme ||--o{ Rating : receives_rating
  Meme ||--o{ Favorite : is_favorited
  Meme ||--o{ TagAssignment : tagged_by
  Tag  ||--o{ TagAssignment : defines
  User ||--o{ TagAssignment : applies

  User {
    ObjectId _id PK
    string username
    string email
    string passwordHash
    boolean isMember
    Date createdAt
    Date updatedAt
  }

  Meme {
    ObjectId _id PK
    ObjectId user FK
    string title
    string imageURL
    number rating
    string caption
    boolean isDraft
    Date createdAt
    Date updatedAt
  }

  Comment {
    ObjectId _id PK
    ObjectId user FK
    ObjectId meme FK
    string content
    Date createdAt
    Date updatedAt
  }

  Rating {
    ObjectId _id PK
    ObjectId user FK
    ObjectId meme FK
    number value
    Date createdAt
    Date updatedAt
  }

  Favorite {
    ObjectId _id PK
    ObjectId user FK
    ObjectId meme FK
    Date createdAt
    Date updatedAt
  }

  Tag {
    ObjectId _id PK
    string name
    Date createdAt
    Date updatedAt
  }

  TagAssignment {
    ObjectId _id PK
    ObjectId user FK
    ObjectId meme FK
    ObjectId tag FK
    Date createdAt
    Date updatedAt
  }

  Membership {
    ObjectId _id PK
    ObjectId user FK
    string role
    Date createdAt
    Date updatedAt
  }