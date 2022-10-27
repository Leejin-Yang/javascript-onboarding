function getRelations(friends) {
  const relations = friends.reduce((acc, cur) => {
    const [crewA, crewB] = cur;

    acc[crewA] = [...(acc[crewA] || []), crewB];
    acc[crewB] = [...(acc[crewB] || []), crewA];

    return acc;
  }, {});

  return relations;
}

function getRelationScores(user, relations) {
  const relationScores = Object.keys(relations).reduce((acc, cur) => {
    if (cur === user) {
      return acc;
    }

    const acquaintances = relations[cur].filter((friend) =>
      relations[user].includes(friend)
    );
    const score = acquaintances.length * 10;
    acc[cur] = score;

    return acc;
  }, {});

  return relationScores;
}

function getVisitorScores(visitors) {
  const visitorScores = visitors.reduce((acc, cur) => {
    if (!acc[cur]) {
      acc[cur] = 0;
    }

    acc[cur] += 1;

    return acc;
  }, {});

  return visitorScores;
}

function getCrewScores(relationScores, visitorScores) {
  const totalCrews = Object.keys({ ...relationScores, ...visitorScores });
  const crewScores = totalCrews.reduce((acc, cur) => {
    acc[cur] = relationScores[cur] || 0;

    if (visitorScores[cur]) {
      acc[cur] += visitorScores[cur];
    }

    return acc;
  }, {});

  return crewScores;
}

function getSortedCrews(crewScores) {
  const sortedCrewsByName = Object.entries(crewScores).sort();
  const sortedCrewsByScore = sortedCrewsByName
    .sort((prev, cur) => cur[1] - prev[1])
    .filter((crew) => crew[1] !== 0);
  const sortedCrews = sortedCrewsByScore.map((crew) => crew[0]);

  return sortedCrews;
}

function problem7(user, friends, visitors) {
  const relations = getRelations(friends);

  const relationScores = getRelationScores(user, relations);
  const visitorScores = getVisitorScores(visitors);
  const crewScores = getCrewScores(relationScores, visitorScores);

  const sortedCrews = getSortedCrews(crewScores);
  const answer = sortedCrews.filter((crew) => !relations[user].includes(crew));

  if (answer.length > 5) {
    answer.splice(5);
  }

  return answer;
}

module.exports = problem7;
