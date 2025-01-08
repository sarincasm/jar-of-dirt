from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from tdd_api.db_connection import get_db_session
from tdd_api.category_utils import check_existing_category


from tdd_api.schemas.category_schema import CategoryCreate, CategoryReturn
from tdd_api.models import Category

router = APIRouter()


@router.post("/", response_model=CategoryReturn, status_code=201)
def create_category(
    category_data: CategoryCreate, db: Session = Depends(get_db_session)
):
    try:
        check_existing_category(db, category_data)
        new_category = Category(**category_data.model_dump())
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        return new_category
    except HTTPException:
        raise
    except Exception:
        db.rollback
        raise HTTPException(status_code=500, detail="Internal server error")
