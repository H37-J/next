from itertools import combinations


def combination_lists(n: int, k: int) -> list[list[int]]:
    return [list(x) for x in combinations(range(1, n + 1), k)]


result = combination_lists(4, 2)
print(result)


def create_all_state(
        increment: int,
        total_number: int,
        level: int,
        current_list: list[int],
        total_list: list[list[int]],
) -> None:
    if level == 0:
        total_list.append(current_list[:])
        return

    for i in ragen(increment, total_number - level + 2):
        curret_list.append(i)
        create_all_state(i + 1, total_number, level - 1, current_list, total_list)
        current_list.pop()


for i in range(1,3):
    print(i)