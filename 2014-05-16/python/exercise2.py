from exercise1 import *

building = assemblyDiagramInit([1,2,6])([[44],[19,4.2],[0.1,3,3,3,3,0.5]])
# drawNumDiagram(building,GREEN,3)

""" BALCONY """

balcony = assemblyDiagramInit([3,2,3])([[0.2,36.8,7],[4,0.2],[0.3,1.5,1.5]])
balcony = removeCells(balcony,[12,13,14,15,16,17,7,8,11,2])
# drawNumDiagram(balcony,GREEN,3)

building = diagram2cell(balcony,building,10)
building = diagram2cell(balcony,building,9)
building = diagram2cell(balcony,building,8)
building = removeCells(building,[7])
# drawNumDiagram(building,GREEN,3)

""" APARTMENTS """

plan = assemblyDiagramInit([2,1,1])([[22,22],[19],[3]])
plan = diagram2cell(larApply(s(-1,1,1))(apartment),plan,1)
plan = diagram2cell(apartment,plan,0)
# drawNumDiagram(plan,GREEN,3)

building = diagram2cell(plan,building,4)
building = diagram2cell(plan,building,3)
building = diagram2cell(plan,building,2)
building = diagram2cell(plan,building,1)
# drawNumDiagram(building,GREEN,3)

# drawDiagram(building)

