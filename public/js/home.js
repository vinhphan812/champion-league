let matchList = [];

window.onload = () => {
	getMatchInWeek();
};

async function getMatchInWeek() {
	const start = moment().weekday(1).format("YYYY-MM-DD");
	const end = moment().weekday(7).format("YYYY-MM-DD");
	const { data } = await (
		await fetch(`/api/matchInWeek?start=${start}&end=${end}`)
	).json();
	matchList = data;

	renderMatch();
}

async function renderMatch() {
	const html = matchList.length
		? matchList.map(
				({ date, name, stadium, teams, league, _id }) =>
					`<tr id=""${_id} class="align-middle">
               <td>${moment(date).format("HH:mm YYYY-MM-DD")}</td>
               <td>
                    <a href="/leagues/${league}/matchs/${_id}">${name}</a>
               </td>
               <td>
                    <a href="/teams/${teams[0]._id}">
                         <img class="logo-image" src="${teams[0].logo_path}"/>
                    </a>
               </td>
               <td>
                    <a href="/teams/${teams[1]._id}">
                         <img class="logo-image"src="${teams[1].logo_path}"/>
                    </a>
               </td>
               <td>${stadium.name}</td>
          </tr>`
		  )
		: "<tr class='h4 text-center'><td colspan='6'>Không có dữ liệu trận đấu nào!!!</td></tr>";

	$("#matchs tbody").html(html);
}
