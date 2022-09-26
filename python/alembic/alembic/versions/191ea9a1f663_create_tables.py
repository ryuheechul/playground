"""create tables

Revision ID: 191ea9a1f663
Revises:
Create Date: 2022-09-26 10:59:48.075246

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '191ea9a1f663'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(
        'CREATE TABLE countries ( id serial primary key, name text not null);'
        'CREATE TABLE cities ( id serial primary key, country_id integer, name text not null);'
    );
    op.execute(
        "INSERT INTO countries VALUES (1, 'South Korea');"
        "INSERT INTO countries VALUES (2, 'United Kingdom');"
        "INSERT INTO countries VALUES (3, 'Canada');"
        "INSERT INTO countries VALUES (4, 'No Country');"
    );
    op.execute(
        "INSERT INTO cities VALUES (1, 1, 'Seoul');"
        "INSERT INTO cities VALUES (2, 2, 'London');"
        "INSERT INTO cities VALUES (3, 3, 'Vancouver');"
        "INSERT INTO cities VALUES (4, 4, 'This');"
        "INSERT INTO cities VALUES (5, 4, 'Does not');"
        "INSERT INTO cities VALUES (6, 4, 'Exist');"
    );

def downgrade() -> None:
    op.execute(
        'DROP TABLE cities;'
        'DROP TABLE countries;'
    );
