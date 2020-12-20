def basic_flow():
  while True:
    try:
      number = int(input('Enter a number:'))
      break
    except:
      print('Thats not a valid number. Try again.')
    finally:
      print('Attempt made')

def specify_exception_type():
  while True:
    try:
      number = int(input('Enter a integer:'))
      100/number
      break
    except (ValueError, ZeroDivisionError) as e:
      print('Thats not a valid integer. Try again. {}'.format(str(e).title()))
    except KeyboardInterrupt:
      print('You cant escape')
    finally:
      print('Attempt made')
