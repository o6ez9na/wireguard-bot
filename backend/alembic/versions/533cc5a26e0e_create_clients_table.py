"""Create clients table

Revision ID: 533cc5a26e0e
Revises: c1a8f3b9420e
Create Date: 2024-11-19 14:56:25.906830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '533cc5a26e0e'
down_revision: Union[str, None] = 'c1a8f3b9420e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('clients',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('telegram_id', sa.String(), nullable=False),
    sa.Column('public_key', sa.String(), nullable=False),
    sa.Column('private_key', sa.String(), nullable=False),
    sa.Column('config', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('telegram_id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('public_key', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('private_key', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('config', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.PrimaryKeyConstraint('id', name='users_pkey')
    )
    op.drop_table('clients')
    # ### end Alembic commands ###