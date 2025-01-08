from itertools import count

from faker import Faker

faker = Faker()


def get_random_category_dict(id_: int = None):
    id_counter = count(start=1)
    id_ = next(id_counter)
    return {
        "id": id_,
        "name": faker.word(),
        "slug": faker.slug(),
        "is_active": faker.boolean(),
        "level": faker.random_int(1, 20),
        "parent_id": None,
    }
