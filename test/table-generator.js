let texto = `

| clave | valor | ejemplo |
| ----- | ----- | ------- |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |

asdasdk ajjsh nsbfak kshsk asjd.

| clave | valor | ejemplo |
| ----- | ----- | ------- |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |
| var 1 | sadsi | isksksk |

`

let C = console,
	log = (x, y = "") => C.log(x, y),
	time = (x, y) => C.time(x, y)


log(
	texto
	.replace(/\|[\|\-\x20:]+\|/g, "</thead><tbody>")
	.replace(/\|[^\n]+\|/g, input => {
		input = input.split('|')

		let newTable = ""

		input.forEach((i, p) => {
			if (p == 0) newTable += "<tr>";
			if (p == input.length - 1) newTable += "</tr>";

			if (i !== "") newTable += "<td>" + i.trim() + "</td>";
		})

		return newTable
	})
	.replace(/<(\/tr|tbody)>\n<(tr|\/thead)>/g, "<$1><$2>")
	.replace(/^(<tr>(.+)<\/tr>)/gm, "<table><thead>$1</tbody></table>")
)


