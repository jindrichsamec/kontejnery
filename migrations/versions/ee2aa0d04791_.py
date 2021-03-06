"""empty message

Revision ID: ee2aa0d04791
Revises: c45a6b3de513
Create Date: 2016-12-06 21:15:05.153828

"""
from alembic import op
import sqlalchemy as sa
import geoalchemy2


# revision identifiers, used by Alembic.
revision = 'ee2aa0d04791'
down_revision = 'c45a6b3de513'
branch_labels = None
depends_on = None


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('spatial_ref_sys')
    op.add_column('containers', sa.Column('coordinates', geoalchemy2.types.Geography(geometry_type='POINT', srid=4326), nullable=True))
    op.drop_index('ix_containers_position', table_name='containers')
    op.drop_column('containers', 'position')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('containers', sa.Column('position', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_containers_position', 'containers', ['position'], unique=False)
    op.drop_column('containers', 'coordinates')
    op.create_table('spatial_ref_sys',
    sa.Column('srid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('auth_name', sa.VARCHAR(length=256), autoincrement=False, nullable=True),
    sa.Column('auth_srid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('srtext', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.Column('proj4text', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.CheckConstraint('(srid > 0) AND (srid <= 998999)', name='spatial_ref_sys_srid_check'),
    sa.PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey')
    )
    ### end Alembic commands ###
