model
  schema 1.1

type scope

type resourcetype

type resourceid

type category

type subcategory

type user
  relations
    define member_of: [group]
    define role_assignment: [roleassignment]

type group
  relations
    define member: [user]
    define role_assignment: [roleassignment]

type role
  relations
    define feature: [feature]

type feature
  relations
    define category: [category]
    define subcategory: [subcategory]
    define scope: [scope]
    define resourcetype: [resourcetype]

type roleassignment
  relations
    define role: [role]
    define scope: [scope]
    define resourcetype: [resourcetype]
    define resourceid: [resourceid]