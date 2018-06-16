import {Collection, Index, Instance, ObjectID, Property} from "iridium";

interface MediaDocument {
	_id?: string;
	owner: string;
	uploadName: string;
	dateCreated: Date;
	hash: string;
	accesses: number;
}

@Index({hash: 1}, {unique: true})
@Collection('medias')
class Media extends Instance<MediaDocument, Media> implements MediaDocument {
	@ObjectID
	_id: string;

	@Property(/^.+$/)
	owner: string;

	@Property(String)
	hash: string;

	@Property(String)
	uploadName: string;

	@Property(Number)
	accesses: number = 0;

	@Property(Date)
	dateCreated: Date;


	static onCreating(doc: MediaDocument) {
		doc.dateCreated = new Date();
	}
}
