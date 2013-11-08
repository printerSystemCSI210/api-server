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
* `GET    /organizations/1/printers/2` — Get details of printer `2` in organization `1`
* `DELETE /organizations/1/printers/2` — Delete printer `2` in organization `1`
* `PUT    /organizations/1/printers/2` — Update the details of printer `2` in organization `1`
* `GET    /organizations/1/printers/2/statuses` — Gets a list of all status updates for the printer
* `PUT    /organizations/1/printers/2/statuses` — Adds a new status entry for the printer

Database Structure
------------------

See [this file](https://github.com/printerSystemCSI210/api-server/blob/master/initializers/_project.js) for the current database structure