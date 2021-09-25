export async function create(req, res) {

    const poll = new req.context.models.Poll({
        question: req.body.question,
        answers: req.body.answers,
        slack_message_timestamp: req.body.slack_message_timestamp
    });

    try {

        const savePoll = await poll.save();
        return res.send(savePoll);

    } catch (err) {

        if (err.errors.link.kind == "unique") {
            return res.status(409).send({
                message: err.message
            });

        }

        return res.status(400).send(err);

    }
}
export async function getById(req, res) {
    const poll = await req.context.models.Poll.findById(
        req.params.pollId
    );
    return res.send(poll);
}

export async function vote(req, res) {
    const poll = await req.context.models.Poll.findById(
        req.params.pollId
    );

    for (const curr_vote of poll.votes) {
        if (curr_vote.username == req.body.username) {
            poll.votes.pull(curr_vote._id);
        }
    }


    /* todo: save may throw an exception */
    poll.votes.push(req.body);
    const vote_result = await poll.save();


    /**count votes */
    var vote_counts = {}
    for (const curr_answer of poll.answers) {
        vote_counts[curr_answer.description] = 0;
        for (const curr_vote of poll.votes) {
            if (curr_vote.voted_answer == curr_answer.description) {
                vote_counts[curr_answer.description]++;
            }

        }
    }


    return res.send({ "vote_results": vote_counts });
}


export async function getAll(req, res) {
    const poll = await req.context.models.Poll.find(
        req.query
    );

    return res.send(poll);
}