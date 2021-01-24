names = input("Enter names (comma separated):").title().split(",")
assignments = input("Enter assignment counts (comma separated):").split(",")
grades = input("Enter grades (comma separated):").split(",")

message = "Hi {},\nYou have {} assignments left to \
submit before you can graduate. Your current grade is {} and can increase \
to {} if you submit all assignments before the due date.\n"

for name, assignment, grade in zip(names, assignments, grades):
    print(message.format(name, assignment, grade, int(grade) + int(assignment)*2))
