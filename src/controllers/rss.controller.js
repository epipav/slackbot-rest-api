/* todo: rss and keyword controllers can be split into different files */

export async function getAllKeywords(req, res) {

    var query = {};

    if (req.query.keyword) {
        query = { "keyword": req.query.keyword };
    }

    const keywords = await req.context.models.Keyword.find(query);
    return res.send(keywords);
}

export async function getKeyword(req, res) {
    const keyword = await req.context.models.Keyword.findById(
        req.params.keywordId
    );
    return res.send(keyword);
}


export async function createKeyword(req, res) {

    const keyword = new req.context.models.Keyword({
        keyword: req.body.keyword,
        context: req.body.context,
        slack_post_channel: req.body.slack_post_channel
    });

    try {
        const saveKeyword = await keyword.save();
        return res.send(saveKeyword);

    } catch (err) {

        if (err.errors.keyword.kind == "unique") {
            return res.status(409).send({
                message: err.message
            });

        }
        return res.status(400).send(err);
    }
}

export async function removeKeyword(req, res) {

    try {
        await req.context.models.Keyword.deleteOne({
            _id: req.params.keywordId
        });
        return res.status(204).send({});

    } catch (err) {
        return res.status(400).send(err);
    }

}

export async function getRss(req, res) {
    const rss = await req.context.models.Rss.findById(
        req.params.rssId
    );
    return res.send(rss);
}

export async function removeRss(req, res) {

    try {
        await req.context.models.Rss.deleteOne({
            _id: req.params.rssId
        });
        return res.status(204).send({});

    } catch (err) {
        return res.status(400).send(err);
    }

}

export async function getAllRss(req, res) {
    var query = {};

    if (req.query.link) {
        query = { "link": req.query.link };
    }

    const rss = await req.context.models.Rss.find(query);
    return res.send(rss);
}

export async function createRss(req, res) {

    const rss = new req.context.models.Rss({
        link: req.body.link,
        type: req.body.type,
        google_alerts_keywords: req.body.google_alerts_keywords
    });

    try {
        const saveRss = await rss.save();
        return res.send(saveRss);

    } catch (err) {

        if (err.errors.link.kind == "unique") {
            return res.status(409).send({
                message: err.message
            });

        }

        return res.status(400).send(err);

    }
}


export async function updateRss(req, res) {


    try {
        const rss = await req.context.models.Rss.findOneAndUpdate({
            _id: req.params.rssId
        },
            req.body,
            { new: true }
        );
        return res.status(200).send(rss);
    } catch (err) {
        return res.status(400).send(err);
    }


}