
/* todo: db call missing try catch block. Should be returning 404 for not found.*/
export async function getCompetitor(req, res) {
    const competitor = await req.context.models.Competitor.findById(
        req.params.competitorId
    );
    return res.send(competitor);
}

export async function removeCompetitor(req, res) {

    try {
        await req.context.models.Competitor.deleteOne({
            _id: req.params.competitorId
        });
        return res.status(204).send({});

    } catch (err) {
        return res.status(400).send(err);
    }

}

/* todo: db call missing try catch block. Should be returning 404 for not found.*/
export async function getAllCompetitors(req, res) {

    var query = {};

    if(req.query.name){
        query = {"name": req.query.name};
    }

    const competitor = await req.context.models.Competitor.find(query);
    return res.send(competitor);
}

export async function createCompetitor(req, res) {

    const competitor = new req.context.models.Competitor({
        name: req.body.name,
        linkedin: req.body.linkedin
    });

    try {
        const saveCompetitor = await competitor.save();
        return res.send(saveCompetitor);

    } catch (err) {
        if (err.errors.name.kind == "unique") {
            return res.status(409).send({
                message: err.message
            });

        }

        return res.status(400).send(err);

    }
}