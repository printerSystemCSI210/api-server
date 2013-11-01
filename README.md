Printer API Server
==================

Command Summary
---------------

* `GET    /organizations` — List of organizations
* `POST   /organizations` — Create new organization
* `GET    /organizations/1` — Get details of organization `1`
* `PUT    /organizations/1` — Update details of organization `1`
* `DELETE /organizations/1` — Deletes organization `1`
* `GET    /organizations/1/printers` — List of printers in organization `1`
* `POST   /organizations/1/printers` — Add new printer to organization `1`
* `DELETE /organizations/1/printers` — Delete all printers from organization `1`
* `GET    /organizations/1/printers/2` — Get details of printer `2` in organization `1`
* `DELETE /organizations/1/printers/2` — Delete printer `2` in organization `1`
* `PUT    /organizations/1/printers/2` — Update the details of printer `2` in organization `1`
* `GET    /organizations/1/printers/2/statuses` — Gets a list of all status updates for the printer
* `PUT    /organizations/1/printers/2/statuses` — Adds a new status entry for the printer
* `GET    /organizations/1/printers/2/statuses/3` — Gets status `3` for the printer

Database Structure
------------------

organization *document*
* _id: auto-incremented
* name: string
* printers [printer\_id, printer\_id, ...]
* users [user\_id, user\_id, ...]

printer *document*
* _id: auto-incremented
* name: string
* location: string
* ipAddress: string
* history [
    {
    * timeStamp: DateTime
    * status: string
    * pageCount: number
    * tonerLevel: number
    }
    ...
]
* manufacturer: string
* model: string

user *document*
* _id: auto-incremented
* name: string
* email: string
* password: string (encrypted)
* organization\_id
* role: string (enum: admin, regular)