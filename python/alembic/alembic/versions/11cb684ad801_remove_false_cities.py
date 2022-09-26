"""remove false cities

Revision ID: 11cb684ad801
Revises: 191ea9a1f663
Create Date: 2022-09-26 11:20:51.118845

"""
from alembic import op
import sqlalchemy as sa
from functools import reduce

# revision identifiers, used by Alembic.
revision = '11cb684ad801'
down_revision = '191ea9a1f663'
branch_labels = None
depends_on = None


countries_to_remove = [
    'No Country',
]

countries_to_remove_for_sql = reduce(
    lambda left, right: f'{left}, {right}',
    map(
        lambda country: f"'{country}'",
        countries_to_remove
    )
)

def upgrade():
    conn = op.get_bind()
    result_as_tuples = conn.execute(
        f'SELECT id FROM countries WHERE name IN ({countries_to_remove_for_sql});'
    ).fetchall()


    ids = list(map(lambda tpl: tpl[0], result_as_tuples))

    if len(ids):
        ids_for_sql = reduce(
            lambda left, right: f'{left}, {right}',
            ids,
        )

        op.execute(
            f'DELETE FROM cities WHERE country_id IN ({ids_for_sql});'
            f'DELETE FROM countries WHERE id IN ({ids_for_sql});'
        )

def downgrade():
    pass
