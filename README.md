## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, unique: true|
|email|string|null: false, unique : true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :messages
- has_many :groups , through: gruoups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, |
|name|string|null: false,|

### Association
- has_many :groups_users
- has_many :messages
- has_many :users, through: groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|string||
|image|integer||
|user_id|integer|null: false, foreign_key:true|
|group_id|integer|null: false, foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group
