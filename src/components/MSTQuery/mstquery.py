from typing import List
from typing import Optional

import mstat
import mstatquery
from mstat import User


def parse_file(f) -> List[User]:
    return mstat.read_users(f)


def query_users(query: Optional[str], users: List[User]) -> List[User]:
    query_fn = mstatquery.parse_query(query)
    return [u for u in users if query_fn(u)]
