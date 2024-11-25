"""Upgrade_v3

Revision ID: 4876cb7edae9
Revises: 
Create Date: 2024-11-20 14:16:35.646081

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4876cb7edae9'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admins',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('telegram_id', sa.String(), nullable=False),
    sa.Column('public_key', sa.String(), nullable=False),
    sa.Column('private_key', sa.String(), nullable=False),
    sa.Column('config', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clients',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('telegram_id', sa.String(), nullable=False),
    sa.Column('public_key', sa.String(), nullable=False),
    sa.Column('private_key', sa.String(), nullable=False),
    sa.Column('config', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('clients')
    op.drop_table('admins')
    # ### end Alembic commands ###
