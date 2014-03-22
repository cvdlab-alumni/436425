from pyplasm import *

# lower terrace




floor0 = PROD([Q(20),Q(8.15)])


# column
c_size = 0.27
c_width = c_size/12

column_p1 = STRUCT(NN(2)([ PROD([Q(c_size),Q(c_width)]) ,T(2)(c_size-c_width)]))
column_p2 = PROD([QUOTE([-c_size/2+c_width/2,c_width]), QUOTE([-c_width,c_size-c_width*2,-c_width])])
column =  ( STRUCT([column_p1,column_p2]) )

column_row1 = STRUCT(NN(3)([ T([1,2])([2-c_size/2,-c_size])(column) , T(1)(8)]))
column_row2 = STRUCT(NN(2)([ T([1,2])([10-c_size,8.15])(column) , T(1)(8)])) 

floor0 = STRUCT([column_row1,column_row2,floor0])

VIEW(floor0)