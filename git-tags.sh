#:!/bin/ls -l .b*
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color
LASTAG=`git describe --tags`
if [ -z "$LASTAG" ] 
then
  echo "${RED}You need create an initial tag, ex v0.0.1${NC}"
else
  echo "This is your last tag: ${CYAN}$LASTAG${NC}" 
fi
read -p "ENTER WITH YOUR NEW TAG VERSION: " newtag 
if [ $newtag = "$LASTAG" ]
then
  echo "${RED}Ops: Already exists this tag ! try again${NC}"
  exit
fi
read -p "DESCRIBE YOUR TAG VERSION RELEASE: " releaseDescription 
echo "YOUR NEW TAG RELEASE IS:${CYAN}$newtag $releaseDescription${NC}"
read -p "TYPE YOUR COMMIT MSG: " commit_msg
exec git commit -a -m "$commit_msg" & git tag -a "$newtag" -m "$releaseDescription" 
